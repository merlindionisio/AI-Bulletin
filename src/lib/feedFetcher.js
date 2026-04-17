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
  { name: 'Towards Data Science', url: 'https://towardsdatascience.com/feed' }
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
