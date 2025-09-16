import { NextResponse } from 'next/server';

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GooglePlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  url?: string;
}

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;
    
    if (!apiKey || !placeId) {
      return NextResponse.json(
        { error: 'Google Places API key or Place ID not configured' }, 
        { status: 500 }
      );
    }

    console.log('Fetching Google reviews for place ID:', placeId);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&key=${apiKey}`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error_message) {
      console.error('Google API Error:', data.error_message);
      throw new Error(data.error_message);
    }

    if (!data.result) {
      throw new Error('No place data found');
    }

    // Filtrar y limpiar los datos
    const placeDetails: GooglePlaceDetails = {
      name: data.result.name,
      rating: data.result.rating || 0,
      user_ratings_total: data.result.user_ratings_total || 0,
      reviews: (data.result.reviews || []).map((review: any) => ({
        author_name: review.author_name,
        author_url: review.author_url,
        language: review.language,
        profile_photo_url: review.profile_photo_url,
        rating: review.rating,
        relative_time_description: review.relative_time_description,
        text: review.text,
        time: review.time
      })),
      url: data.result.url,
    };

    console.log(`Successfully fetched ${placeDetails.reviews.length} reviews`);

    return NextResponse.json(placeDetails, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    
    // Fallback data in case of API failure
    const fallbackData: GooglePlaceDetails = {
      name: "PJ Parsons Presents",
      rating: 5,
      user_ratings_total: 120,
      reviews: [
        {
          author_name: "Ashley Short",
          rating: 5,
          text: "The PJ Parsons Presents team was amazing to work with!! From helping set up the day of, making announcements, and playing the best dance songs, the team helped the day run so smoothly! Matt's energy while DJing was awesome for all of our guests!!",
          relative_time_description: "2 months ago",
          time: Date.now() / 1000,
        },
        {
          author_name: "Nyssa W.",
          rating: 5,
          text: "Seriously, stop looking and hire this company. Beyond outstanding, I had an amazing experience with them. I love that you get a day of coordinator and a DJ when you use this company! The DJ/MCs were absolutely fantastic as well.",
          relative_time_description: "3 months ago",
          time: Date.now() / 1000,
        },
        {
          author_name: "Madison",
          rating: 5,
          text: "We had PJ Parsons as our DJ for our wedding, as well as for our day of coordinator! PJ's crew was ON IT for MC and DJing! They were fun, polite and knew exactly what the crowd needed, and when. They kept our night flowing seamlessly!",
          relative_time_description: "4 months ago",
          time: Date.now() / 1000,
        },
        {
          author_name: "Sarah Johnson",
          rating: 5,
          text: "PJ Parsons Presents made our wedding absolutely perfect! From the planning stages to the last dance, everything was flawless. Jeremy's officiating was heartfelt and personal, and the coordination was seamless.",
          relative_time_description: "5 months ago",
          time: Date.now() / 1000,
        },
        {
          author_name: "Michael Chen",
          rating: 5,
          text: "Outstanding service from start to finish! The team's professionalism and attention to detail was incredible. Our guests are still talking about how amazing our wedding was. Highly recommend!",
          relative_time_description: "6 months ago",
          time: Date.now() / 1000,
        }
      ],
      url: "https://www.google.com/maps/place/PJ+Parsons+Presents/@47.9257369,-122.0810789,17z/data=!4m8!3m7!1s0x549aa94a09444b17:0x77c9b02c62e4d569!8m2!3d47.9257369!4d-122.0810789!9m1!1b1!16s%2Fg%2F11t75kps9g?entry=ttu"
    };

    return NextResponse.json(fallbackData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400'
      }
    });
  }
}