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
      return NextResponse.json(
        { error: 'Instagram access token not configured' }, 
        { status: 500 }
      );
    }

    console.log('Fetching Instagram posts...');

    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_url,media_type,permalink,caption,timestamp,like_count,comments_count,thumbnail_url&access_token=${accessToken}&limit=12`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Instagram API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      // Return fallback data instead of throwing error
      return NextResponse.json(getFallbackInstagramData(), {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400'
        }
      });
    }

    const data: InstagramResponse = await response.json();
    
    if (!data.data) {
      console.error('No Instagram data received');
      return NextResponse.json(getFallbackInstagramData(), {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400'
        }
      });
    }

    // Filter and clean the data
    const filteredPosts = data.data
      .filter(post => post.media_type === 'IMAGE' || post.media_type === 'VIDEO' || post.media_type === 'CAROUSEL_ALBUM')
      .slice(0, 12);

    console.log(`Successfully fetched ${filteredPosts.length} Instagram posts`);

    return NextResponse.json({
      posts: filteredPosts,
      total: filteredPosts.length
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });

  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    
    // Return fallback data instead of error
    return NextResponse.json(getFallbackInstagramData(), {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400'
      }
    });
  }
}

// Fallback data cuando la API falla
function getFallbackInstagramData() {
  return {
    posts: [
      {
        id: 'fallback-1',
        media_url: '/instagram-placeholder-1.jpg',
        media_type: 'IMAGE' as const,
        permalink: 'https://instagram.com/pjparsonspresents',
        caption: 'Beautiful wedding setup from last weekend! ✨ #PJParsonsPresents #WeddingDJ #SnohomishCounty',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
        like_count: 45,
        comments_count: 8
      },
      {
        id: 'fallback-2',
        media_url: '/instagram-placeholder-2.jpg',
        media_type: 'IMAGE' as const,
        permalink: 'https://instagram.com/pjparsonspresents',
        caption: 'Another amazing couple celebrating their special day! 💖 #Wedding #DJ #Coordination',
        timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
        like_count: 62,
        comments_count: 12
      },
      {
        id: 'fallback-3',
        media_url: '/instagram-placeholder-3.jpg',
        media_type: 'IMAGE' as const,
        permalink: 'https://instagram.com/pjparsonspresents',
        caption: 'Setting up for tonight\'s reception! Can\'t wait to get this party started 🎉',
        timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
        like_count: 38,
        comments_count: 5
      },
      {
        id: 'fallback-4',
        media_url: '/instagram-placeholder-4.jpg',
        media_type: 'IMAGE' as const,
        permalink: 'https://instagram.com/pjparsonspresents',
        caption: 'Love seeing happy couples on their wedding day! 👰🤵 #WeddingBliss #PJParsons',
        timestamp: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), // 4 weeks ago
        like_count: 71,
        comments_count: 15
      },
      {
        id: 'fallback-5',
        media_url: '/instagram-placeholder-5.jpg',
        media_type: 'IMAGE' as const,
        permalink: 'https://instagram.com/pjparsonspresents',
        caption: 'Behind the scenes: setting up our photo booth for tonight\'s celebration! 📸',
        timestamp: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), // 5 weeks ago
        like_count: 29,
        comments_count: 3
      },
      {
        id: 'fallback-6',
        media_url: '/instagram-placeholder-6.jpg',
        media_type: 'IMAGE' as const,
        permalink: 'https://instagram.com/pjparsonspresents',
        caption: 'Beautiful venue, beautiful couple, perfect day! ✨ #WeddingMagic #EventCoordination',
        timestamp: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(), // 6 weeks ago
        like_count: 56,
        comments_count: 9
      }
    ],
    total: 6,
    fallback: true
  };
}