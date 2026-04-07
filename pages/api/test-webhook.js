export default async function handler(req, res) {
  return res.status(200).json({ 
    success: true,
    message: 'API route works!',
    timestamp: new Date().toISOString(),
    env: {
      has_supabase_url: !!process.env.SUPABASE_URL,
      has_supabase_key: !!process.env.SUPABASE_ANON_KEY,
      has_stripe_key: !!process.env.STRIPE_SECRET_KEY,
      has_resend_key: !!process.env.RESEND_API_KEY,
    }
  });
}