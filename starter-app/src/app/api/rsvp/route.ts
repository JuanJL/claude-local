import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { data, error } = await getSupabase()
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch RSVPs' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch RSVPs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, attending, dietary, message } = body

    if (!name || !attending) {
      return NextResponse.json(
        { error: 'Name and attending status are required' },
        { status: 400 }
      )
    }

    if (!['yes', 'no', 'maybe'].includes(attending)) {
      return NextResponse.json(
        { error: 'Invalid attending value' },
        { status: 400 }
      )
    }

    const { error } = await getSupabase().from('rsvps').insert({
      name: name.trim(),
      attending,
      dietary: dietary?.trim() || null,
      message: message?.trim() || null,
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save RSVP' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
