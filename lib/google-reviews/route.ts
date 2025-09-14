import { NextRequest, NextResponse } from 'next/server';

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
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&key=${apiKey}`
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
      reviews: data.result.reviews || [],
      url: data.result.url,
    };

    console.log(`Successfully fetched ${placeDetails.reviews.length} reviews`);

    return NextResponse.json(placeDetails);
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}