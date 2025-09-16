// app/api/instagram/route.ts
import { NextResponse } from 'next/server';

interface InstagramPost {
  id: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  caption?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  thumbnail_url?: string;
}

interface InstagramResponse {
  data: InstagramPost[];
  paging?: {
    cursors?: {
      before?: string;
      after?: string;
    };
    next?: string;
  };
}

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    if (!accessToken) {
      console.error('Instagram access token not found');
      return NextResponse.json(getFallbackInstagramData(), {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400'
        }
      });
    }

    console.log('🔄 Fetching Instagram posts with token:', accessToken.substring(0, 10) + '...');

    // Llamada a la API de Instagram con tu token
    const instagramUrl = `https://graph.instagram.com/me/media?fields=id,media_url,media_type,permalink,caption,timestamp,like_count,comments_count,thumbnail_url&access_token=${accessToken}&limit=12`;
    
    const response = await fetch(instagramUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    console.log('📡 Instagram API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Instagram API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: instagramUrl.replace(accessToken, 'HIDDEN_TOKEN')
      });
      
      // Analizar el tipo de error
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error) {
          console.error('📝 Error details:', errorData.error);
          
          // Errores específicos de Instagram
          if (errorData.error.code === 190) {
            console.error('🔑 Token error: Access token is invalid or expired');
          }
          if (errorData.error.code === 100) {
            console.error('🔍 API error: Invalid parameter or missing permissions');
          }
        }
      } catch (parseError) {
        console.error('Cannot parse error response:', parseError);
      }
      
      // Return fallback data instead of throwing error
      return NextResponse.json(getFallbackInstagramData(), {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400'
        }
      });
    }

    const data: InstagramResponse = await response.json();
    console.log('📊 Instagram data received:', data);
    
    if (!data.data || !Array.isArray(data.data)) {
      console.error('❌ No Instagram data received or invalid format:', data);
      return NextResponse.json(getFallbackInstagramData(), {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400'
        }
      });
    }

    // Filter and clean the data
    const filteredPosts = data.data
      .filter(post => {
        // Verificar que el post tiene los campos necesarios
        return post && 
               post.id && 
               post.media_url && 
               (post.media_type === 'IMAGE' || post.media_type === 'VIDEO' || post.media_type === 'CAROUSEL_ALBUM');
      })
      .slice(0, 12);

    console.log(`✅ Successfully filtered ${filteredPosts.length} Instagram posts from ${data.data.length} total`);

    // Log de muestra de posts para debug
    if (filteredPosts.length > 0) {
      console.log('📝 Sample post:', {
        id: filteredPosts[0].id,
        type: filteredPosts[0].media_type,
        caption: filteredPosts[0].caption ? filteredPosts[0].caption.substring(0, 50) + '...' : 'No caption',
        hasUrl: !!filteredPosts[0].media_url
      });
    }

    return NextResponse.json({
      posts: filteredPosts,
      total: filteredPosts.length,
      source: 'instagram_api',
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });

  } catch (error) {
    console.error('💥 Error fetching Instagram posts:', error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Return fallback data instead of error
    return NextResponse.json(getFallbackInstagramData(), {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400'
      }
    });
  }
}

// Fallback data cuando la API falla - usando imágenes reales de bodas
function getFallbackInstagramData() {
  console.log('🔄 Using fallback Instagram data');
  
  return {
    posts: [
      {
        id: 'fallback-1',
        media_url: '/images/wedding-1.jpg', // Necesitarás estas imágenes
        media_type: 'IMAGE' as const,
        permalink: 'https://instagram.com/pjparsonspresents',
        caption: 'Beautiful wedding setup from last weekend! ✨ Working with amazing couples is what we live for. #PJParsonsPresents #WeddingDJ #SnohomishCounty #WeddingPlanning',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        like_count: 45,
        comments_count: 8
      },
      {
        id: 'fallback-2',
        media_url: '/images/wedding-2.jpg',
        media_type: 'IMAGE' as const,
        permalink: 'https://instagram.com/pjparsonspresents',
        caption: 'Another amazing couple celebrating their special day! 💖 The joy on their faces makes everything worth it. #Wedding #DJ #Coordination #Love',
        timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        like_count: 62,
        comments_count: 12
      },
      {
        id: 'fallback-3',
        media_url: '/images/wedding-3.jpg',
        media_type: 'IMAGE' as const,
        permalink: 'https://instagram.com/pjparsonspresents',
        caption: 'Setting up for tonight\'s reception! Can\'t wait to get this party started 🎉 The dance floor is going to be amazing tonight!',
        timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        like_count: 38,
        comments_count: 5
      },
      {
        id: 'fallback-4',
        media_url: '/images/wedding-4.jpg',
        media_type: 'IMAGE' as const,
        permalink: 'https://instagram.com/pjparsonspresents',
        caption: 'Love seeing happy couples on their wedding day! 👰🤵 After 20+ years, we still get emotional at every ceremony. #WeddingBliss #PJParsons',
        timestamp: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
        like_count: 71,
        comments_count: 15
      },
      {
        id: 'fallback-5',
        media_url: '/images/wedding-5.jpg',
        media_type: 'IMAGE' as const,
        permalink: 'https://instagram.com/pjparsonspresents',
        caption: 'Behind the scenes: setting up our photo booth for tonight\'s celebration! 📸 Everyone loves a good photo booth at weddings.',
        timestamp: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
        like_count: 29,
        comments_count: 3
      },
      {
        id: 'fallback-6',
        media_url: '/images/wedding-6.jpg',
        media_type: 'IMAGE' as const,
        permalink: 'https://instagram.com/pjparsonspresents',
        caption: 'Beautiful venue, beautiful couple, perfect day! ✨ Snohomish County has some of the most amazing wedding venues. #WeddingMagic #EventCoordination',
        timestamp: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
        like_count: 56,
        comments_count: 9
      }
    ],
    total: 6,
    fallback: true,
    source: 'fallback_data',
    timestamp: new Date().toISOString()
  };
}