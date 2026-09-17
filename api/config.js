export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
    appName: process.env.APP_NAME || 'Nutrition.Fitness Go Live Control',
    launchAt: process.env.LAUNCH_AT || '2026-11-01T09:00:00+00:00'
  });
}
