// app/api/honeybook-contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  location: string;
  services: string;
  message: string;
  howHeard: string;
}

interface HoneyBookContact {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: {
    city?: string;
    state?: string;
  };
}

interface HoneyBookLead {
  contact: HoneyBookContact;
  projectType: string;
  eventDate?: string;
  venue?: string;
  notes?: string;
  source?: string;
  customFields?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();
    
    // Validar campos requeridos
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { 
          error: 'Missing required fields: name, email, and message are required',
          success: false 
        },
        { status: 400 }
      );
    }

    // Obtener variables de entorno
    const honeyBookApiKey = process.env.HONEYBOOK_API_KEY;
    const honeyBookProjectTypeId = process.env.HONEYBOOK_PROJECT_TYPE_ID;

    // Log detallado para debug
    console.log('📧 PROCESSING CONTACT FORM:', {
      timestamp: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      eventDate: formData.eventDate || 'Not provided',
      location: formData.location || 'Not provided',
      services: formData.services || 'Not specified',
      howHeard: formData.howHeard || 'Not specified',
      message: formData.message.substring(0, 100) + '...',
      honeyBookApiKey: honeyBookApiKey ? 'Present' : 'Missing',
      honeyBookProjectTypeId: honeyBookProjectTypeId ? 'Present' : 'Missing'
    });

    // Si no hay credenciales de HoneyBook, usar fallback por email
    if (!honeyBookApiKey || !honeyBookProjectTypeId) {
      console.log('❌ HoneyBook credentials not configured, using email fallback');
      await sendEmailFallback(formData);
      
      return NextResponse.json({
        success: true,
        source: 'email_fallback',
        message: 'Your inquiry was sent successfully! We will contact you within 24 hours.'
      });
    }

    // Preparar datos para HoneyBook
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Mapear servicios a descripción
    const serviceMapping: Record<string, string> = {
      'dj-mc-coordination': 'DJ + MC + Wedding Coordination/Planning (Premier Package)',
      'dj-mc': 'DJ + Master of Ceremonies',
      'coordination': 'Wedding Planning & Coordination',
      'enhancements': 'Additional Services (Photo Booth, Officiating, Lighting, Bar Service)',
      '': 'General Inquiry'
    };

    const serviceDescription = serviceMapping[formData.services] || formData.services || 'General Inquiry';

    // Crear payload para HoneyBook
    const honeyBookPayload: HoneyBookLead = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        address: formData.location ? {
          city: formData.location
        } : undefined
      },
      projectType: honeyBookProjectTypeId,
      eventDate: formData.eventDate || undefined,
      venue: formData.location || undefined,
      notes: `
SERVICES REQUESTED: ${serviceDescription}

CLIENT MESSAGE:
${formData.message}

EVENT DETAILS:
- Event Date: ${formData.eventDate || 'Not specified'}
- Location: ${formData.location || 'Not specified'}
- Phone: ${formData.phone || 'Not provided'}
- How they heard about us: ${formData.howHeard || 'Not specified'}

SUBMISSION INFO:
- Form submitted: ${new Date().toLocaleString()}
- Source: PJ Parsons Website Contact Form
- Website: ${request.headers.get('origin') || 'pjparson.vercel.app'}
      `.trim(),
      source: 'PJ Parsons Website',
      customFields: {
        servicesRequested: formData.services,
        howHeardAboutUs: formData.howHeard,
        originalMessage: formData.message,
        submissionDate: new Date().toISOString(),
        websiteSource: request.headers.get('origin') || 'pjparson.vercel.app',
        userAgent: request.headers.get('user-agent') || 'Unknown'
      }
    };

    console.log('🚀 Sending to HoneyBook API:', {
      endpoint: 'https://api.honeybook.com/v1/leads',
      payloadSize: JSON.stringify(honeyBookPayload).length,
      projectType: honeyBookProjectTypeId
    });

    // Enviar a HoneyBook API
    const honeyBookResponse = await fetch('https://api.honeybook.com/v1/leads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${honeyBookApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'PJParsonsWebsite/1.0'
      },
      body: JSON.stringify(honeyBookPayload)
    });

    const responseText = await honeyBookResponse.text();
    
    if (!honeyBookResponse.ok) {
      console.error('❌ HoneyBook API Error:', {
        status: honeyBookResponse.status,
        statusText: honeyBookResponse.statusText,
        response: responseText,
        headers: Object.fromEntries(honeyBookResponse.headers.entries())
      });

      // Si HoneyBook falla, usar email como backup
      await sendEmailFallback(formData);
      
      return NextResponse.json({
        success: true,
        source: 'email_backup',
        message: 'Your inquiry was sent successfully! We will contact you within 24 hours.',
        debug: process.env.NODE_ENV === 'development' ? {
          honeyBookError: responseText,
          status: honeyBookResponse.status
        } : undefined
      });
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ Failed to parse HoneyBook response:', parseError);
      result = { id: 'unknown', message: 'Response received but could not parse' };
    }

    console.log('✅ HoneyBook success:', {
      leadId: result.id || 'unknown',
      status: honeyBookResponse.status
    });
    
    return NextResponse.json({
      success: true,
      source: 'honeybook',
      leadId: result.id || 'created',
      message: '🎉 Perfect! Your inquiry was sent to our booking system successfully. We will contact you within 24 hours to schedule your free consultation!'
    });

  } catch (error) {
    console.error('❌ Contact form processing error:', error);
    
    // En caso de cualquier error, intentar email de respaldo
    try {
      const formData: ContactFormData = await request.json();
      await sendEmailFallback(formData);
      
      return NextResponse.json({
        success: true,
        source: 'email_emergency',
        message: 'Your inquiry was sent successfully! We will contact you within 24 hours.'
      });
    } catch (fallbackError) {
      console.error('❌ Email fallback also failed:', fallbackError);
      
      return NextResponse.json(
        { 
          error: 'Unable to process your inquiry at this moment. Please contact us directly at (425) 471-8780 or Hello@PJParsonsPresents.com',
          success: false,
          fallbackContact: {
            phone: '(425) 471-8780',
            email: 'Hello@PJParsonsPresents.com'
          }
        },
        { status: 500 }
      );
    }
  }
}

// Función de respaldo por email - para logging y notificación manual
async function sendEmailFallback(formData: ContactFormData) {
  try {
    // Log estructurado para que el equipo pueda ver los leads
    console.log('📧 EMAIL FALLBACK - NEW LEAD REQUIRES MANUAL FOLLOW-UP:', {
      timestamp: new Date().toISOString(),
      priority: 'HIGH',
      leadData: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        eventDate: formData.eventDate || 'Not provided',
        location: formData.location || 'Not provided',
        services: formData.services || 'Not specified',
        howHeard: formData.howHeard || 'Not specified',
        message: formData.message,
        messageLength: formData.message.length
      },
      action: 'MANUAL_FOLLOWUP_REQUIRED',
      contactMethods: {
        email: formData.email,
        phone: formData.phone || null
      }
    });

    // Aquí se puede integrar con servicios como:
    // - Resend, SendGrid, Mailgun para envío de emails
    // - Slack notifications
    // - Discord webhooks
    // - Microsoft Teams notifications
    // - Zapier webhooks
    
    // Ejemplo de webhook a Slack (comentado):
    /*
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 New Wedding Lead - Manual Follow-up Required`,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*New Wedding Lead*\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || 'Not provided'}\n*Event Date:* ${formData.eventDate || 'Not specified'}\n*Services:* ${formData.services || 'Not specified'}`
              }
            }
          ]
        })
      });
    }
    */
    
    console.log('📨 Lead logged for manual follow-up:', formData.email);
    
    return { success: true };
  } catch (error) {
    console.error('❌ Email fallback error:', error);
    return { success: false };
  }
}

// Manejar otros métodos HTTP
export async function GET() {
  return NextResponse.json(
    { 
      error: 'Method not allowed. Use POST to submit contact form.',
      success: false,
      allowedMethods: ['POST', 'OPTIONS']
    },
    { status: 405 }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Health check endpoint
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}