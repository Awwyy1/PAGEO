-- Analytics events table for granular event-based tracking
CREATE TABLE analytics_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  link_id uuid REFERENCES links(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('page_view', 'link_click')),
  referrer text,
  country text,
  device text,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_analytics_profile_created ON analytics_events(profile_id, created_at DESC);
CREATE INDEX idx_analytics_profile_type ON analytics_events(profile_id, event_type);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own analytics" ON analytics_events FOR SELECT USING (profile_id = auth.uid());
CREATE POLICY "Service role can insert" ON analytics_events FOR INSERT WITH CHECK (true);
