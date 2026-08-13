import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

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
        replyTo: 'colin@poshpork.com',
        to: email,
        subject: "You're on the list 🔍",
        html: `
          <div style="font-family: Georgia, serif; color: #2c1810; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2c1810 0%, #0a0a0a 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #d4af37; font-size: 28px; margin: 0;">Which Food Is Killing You?</h1>
              <p style="color: #f5f1e8; font-style: italic; margin-top: 10px;">Join the jury. Weigh the evidence.</p>
            </div>

            <div style="background: #f5f1e8; padding: 40px 30px;">
              <h2 style="color: #d4af37; font-size: 24px; margin-bottom: 20px; text-align: center;">You're on the list</h2>

              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Thank you for your interest. We'll be in touch — and we won't send you anything else.
              </p>

              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                In the meantime, the film is available to watch now. Three out of five people
                die from chronic inflammatory disease. Its drivers are lifestyle. The largest
                lifestyle factor, for most of us, is food.
              </p>

              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                So which food is it? The evidence is laid out in full, the witnesses contradict
                each other, and you deliver the verdict.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://www.poshpork.com/movie" style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%); color: #0a0a0a; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Watch the film — €15
                </a>
              </div>

              <p style="font-size: 14px; line-height: 1.6; text-align: center; color: #666; margin-bottom: 30px;">
                One payment. Permanent access. One purchase covers your household.
              </p>

              <p style="font-size: 16px; line-height: 1.6; margin-top: 40px; font-style: italic; color: #666;">
                The investigation continues...
              </p>

              <p style="font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 0;">
                Colin
              </p>
            </div>

            <div style="background: #2c1810; padding: 20px; text-align: center;">
              <p style="color: #f5f1e8; font-size: 12px; margin: 0 0 8px;">
                © 2026 Posh Pork. Mallorca, Spain.
              </p>
              <p style="color: #9a8f80; font-size: 11px; margin: 0; line-height: 1.6;">
                This film is for entertainment and education only. It is not medical advice,
                and nothing in it should replace a conversation with your doctor.
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    return res.status(200).json({ message: 'Successfully joined waitlist' });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}