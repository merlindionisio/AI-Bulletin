import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['description', 'content:encoded'],
  },
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
  }
});

const FEEDS = [
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/' },
  { name: 'HackerNews AI', url: 'https://hnrss.org/newest?q=AI' },
  { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss/' },
  { name: 'AWS Machine Learning', url: 'https://aws.amazon.com/blogs/machine-learning/feed/' },
  { name: 'Towards Data Science', url: 'https://towardsdatascience.com/feed' },
  { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed' },
  { name: 'AI News', url: 'https://www.artificialintelligence-news.com/feed/' },
  { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog/feed.xml' },
  { name: 'Microsoft AI', url: 'https://blogs.microsoft.com/ai/feed/' },
  { name: 'The Batch', url: 'https://www.deeplearning.ai/the-batch/feed/' },
  
  // Dedicated Developer Model Tracking
  { name: 'OpenAI / ChatGPT', url: 'https://hnrss.org/newest?q=OpenAI+OR+ChatGPT+OR+Sora' },
  { name: 'Anthropic / Claude', url: 'https://hnrss.org/newest?q=Anthropic+OR+Claude' },
  { name: 'DeepSeek HQ', url: 'https://hnrss.org/newest?q=DeepSeek' },
  { name: 'Google Gemini', url: 'https://hnrss.org/newest?q=Gemini+OR+DeepMind' },
  { name: 'xAI / Grok', url: 'https://hnrss.org/newest?q=xAI+OR+Grok' },
  { name: 'Perplexity AI', url: 'https://hnrss.org/newest?q=Perplexity' },
  { name: 'Moonshot / Kimi', url: 'https://hnrss.org/newest?q=Kimi+OR+Moonshot' },

  // AI Hardware & Infrastructure
  { name: 'NVIDIA News', url: 'https://blogs.nvidia.com/feed/' },
  { name: 'AI Silicon / GPUs', url: 'https://hnrss.org/newest?q=Nvidia+OR+AMD+OR+TSMC+OR+GPU' }
];

export async function getLatestAIFeeds() {
  const allArticles = [];

  await Promise.all(
    FEEDS.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url);
        parsed.items.forEach((item) => {
          allArticles.push({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            source: feed.name,
          });
        });
      } catch (e) {
        console.error(`Error fetching feed ${feed.name}:`, e);
      }
    })
  );

  // Sort by pubDate descending
  allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  
  return allArticles;
}
