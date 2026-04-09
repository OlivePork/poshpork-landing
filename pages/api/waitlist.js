import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  'https://gpcaonwqvbdzsmypmrwk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2FvbndxdmJkenNteXBtcndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MTA3MTYsImV4cCI6MjA5MTA4NjcxNn0.Ld4zKJYqmLzOwdLep3HN-ThD8QIexMv99ib1K0ClVvA'
);

const resend = new Resend(process.env.RESEND_API_KEY || 're_9PMG3WnS_9gqcsrH4iRVuUSvfQYMvASy9');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  try {
    // Check if email already exists
    const { data: existing } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      return res.status(200).json({ message: 'Already on waitlist' });
    }

    // Add to waitlist
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert([{ email: email.toLowerCase() }]);

    if (insertError) {
      console.error('Supabase error:', insertError);
      return res.status(500).json({ error: 'Failed to join waitlist' });
    }

    // Send confirmation email
    try {
      await resend.emails.send({
        from: 'Posh Pork <mystery@poshpork.com>',
        to: email,
        subject: "You're on the Waitlist! 🔍",
        html: `
          <div style="font-family: Georgia, serif; color: #2c1810; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2c1810 0%, #0a0a0a 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #d4af37; font-size: 28px; margin: 0;">The Posh Pork Murder Mystery</h1>
              <p style="color: #f5f1e8; font-style: italic; margin-top: 10px;">Join the jury. Solve the mystery.</p>
            </div>
            
            <div style="background: #f5f1e8; padding: 40px 30px;">
              <h2 style="color: #d4af37; font-size: 24px; margin-bottom: 20px; text-align: center;">You're On The Waitlist!</h2>
              
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Thank you for your interest in The Posh Pork Murder Mystery digital experience!
              </p>
              
              <div style="background: white; border: 2px solid #d4af37; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
                <p style="font-size: 20px; color: #d4af37; margin: 0; font-weight: bold;">📅 Launching July 2026</p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
                We'll email you as soon as the full digital experience is live and bookings open.
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                In the meantime, if you're in Mallorca, you can experience our live trial sessions at Possessió Vernissa in Llucmajor.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://www.poshpork.com" style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%); color: #0a0a0a; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Visit Posh Pork
                </a>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; margin-top: 40px; font-style: italic; color: #666;">
                The investigation continues...
              </p>
              
              <p style="font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 0;">
                The Posh Pork Team
              </p>
            </div>
            
            <div style="background: #2c1810; padding: 20px; text-align: center;">
              <p style="color: #f5f1e8; font-size: 12px; margin: 0;">
                © 2026 Posh Pork. Mallorca, Spain.
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the request if email fails
    }

    return res.status(200).json({ message: 'Successfully joined waitlist' });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}