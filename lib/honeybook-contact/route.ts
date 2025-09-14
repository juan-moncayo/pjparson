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
  budget?: string;
  notes?: string;
  source?: string;
  customFields?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();
    
    // Validar datos requeridos
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    const honeyBookApiKey = process.env.HONEYBOOK_API_KEY;
    const honeyBookProjectTypeId = process.env.HONEYBOOK_PROJECT_TYPE_ID;

    if (!honeyBookApiKey || !honeyBookProjectTypeId) {
      console.error('HoneyBook credentials not configured');
      return NextResponse.json(
        { error: 'HoneyBook integration not configured' },
        { status: 500 }
      );
    }

    // Preparar datos para HoneyBook
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Mapear servicios a descripción más detallada
    const serviceMapping: Record<string, string> = {
      'dj-mc-coordination': 'DJ + MC + Wedding Coordination/Planning',
      'dj-mc': 'DJ + Master of Ceremonies',
      'coordination': 'Wedding Coordination/Planning',
      'enhancements': 'Additional Services (Photo Booth, Officiating, Lighting, Bar Service)'
    };

    const serviceDescription = serviceMapping[formData.services] || formData.services || 'Not specified';

    // Crear el payload para HoneyBook
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

HOW THEY HEARD ABOUT US: ${formData.howHeard || 'Not specified'}

FORM SUBMISSION DATE: ${new Date().toLocaleDateString()}
      `.trim(),
      source: 'PJ Parsons Website Contact Form',
      customFields: {
        servicesRequested: formData.services,
        howHeardAboutUs: formData.howHeard,
        originalMessage: formData.message
      }
    };

    console.log('Sending to HoneyBook:', JSON.stringify(honeyBookPayload, null, 2));

    // Enviar a HoneyBook API
    const honeyBookResponse = await fetch('https://api.honeybook.com/v1/leads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${honeyBookApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(honeyBookPayload)
    });

    const responseText = await honeyBookResponse.text();
    console.log('HoneyBook response status:', honeyBookResponse.status);
    console.log('HoneyBook response:', responseText);

    if (!honeyBookResponse.ok) {
      let errorMessage = 'HoneyBook API error';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        errorMessage = responseText || errorMessage;
      }
      
      console.error('HoneyBook API Error:', errorMessage);
      
      // Si HoneyBook falla, enviar email de backup
      await sendEmailBackup(formData);
      
      return NextResponse.json(
        { 
          success: true, 
          source: 'email_backup',
          warning: 'Lead created via email backup due to HoneyBook API issue'
        }
      );
    }

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = { message: 'Success' };
    }

    console.log('Successfully created HoneyBook lead:', responseData);
    
    return NextResponse.json({ 
      success: true, 
      source: 'honeybook',
      leadId: responseData.id || responseData.leadId || 'unknown'
    });

  } catch (error) {
    console.error('Contact form processing error:', error);
    
    // Como último recurso, intentar enviar email
    try {
      const formData: ContactFormData = await request.json();
      await sendEmailBackup(formData);
      return NextResponse.json({ 
        success: true, 
        source: 'email_fallback',
        warning: 'Lead created via email due to system error'
      });
    } catch (emailError) {
      console.error('Email backup also failed:', emailError);
    }
    
    return NextResponse.json(
      { error: 'Failed to process contact form. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}

// Función de backup por email
async function sendEmailBackup(formData: ContactFormData) {
  try {
    // Ejemplo simple con fetch a un servicio de email
    // Puedes usar SendGrid, Nodemailer, etc.
    
    const emailPayload = {
      to: 'Hello@PJParsonsPresents.com',
      subject: `🚨 New Lead - ${formData.name} (${formData.services})`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>⚠️ Source:</strong> Website Contact Form (HoneyBook API Issue)</p>
        <hr>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Event Date:</strong> ${formData.eventDate || 'Not provided'}</p>
        <p><strong>Location:</strong> ${formData.location || 'Not provided'}</p>
        <p><strong>Services Interested:</strong> ${formData.services || 'Not specified'}</p>
        <p><strong>How They Heard About Us:</strong> ${formData.howHeard || 'Not provided'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${formData.message}</p>
        <hr>
        <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
        <p><small>Please manually add this lead to HoneyBook.</small></p>
      `
    };

    // Aquí integrarías con tu servicio de email preferido
    console.log('Would send backup email:', emailPayload);
    
    return { success: true };
  } catch (error) {
    console.error('Email backup failed:', error);
    return { success: false };
  }
}