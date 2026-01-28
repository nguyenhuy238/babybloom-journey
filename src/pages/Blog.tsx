import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ChevronRight, Share2, Facebook, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
  };
}

const categories = [
  { id: "all", label: "Tất cả", emoji: "📚" },
  { id: "motor", label: "Vận động", emoji: "🏃" },
  { id: "emotional", label: "Cảm xúc", emoji: "💝" },
  { id: "cognitive", label: "Trí tuệ", emoji: "🧠" },
  { id: "prenatal", label: "Thai giáo", emoji: "🤰" },
  { id: "nutrition", label: "Dinh dưỡng", emoji: "🥗" },
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["blogs", activeCategory],
    queryFn: () => api.get<{ data: any[] }>(`/v1/blogs${activeCategory !== "all" ? `?category=${activeCategory}` : ""}`),
  });

  const apiBlogs = apiResponse?.data || [];

  const blogPosts: BlogPost[] = apiBlogs.map(b => ({
    id: b.id,
    title: b.title,
    excerpt: b.excerpt,
    content: b.content,
    category: b.category,
    readTime: b.readTime,
    date: b.publishedAt,
    thumbnail: b.thumbnailUrl,
    author: {
      name: b.authorName,
      avatar: b.authorAvatar
    }
  }));

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const relatedPosts = selectedPost
    ? blogPosts.filter((p) => p.category === selectedPost.category && p.id !== selectedPost.id).slice(0, 2)
    : [];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-sage/20 to-peach/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Tin tức & Kiến thức
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Cập nhật kiến thức giáo dục sớm, tips nuôi con và nghiên cứu mới nhất
              </p>
            </motion.div>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết..."
                className="pl-12 py-6 text-lg rounded-full"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 border-b border-border sticky top-16 bg-background z-10">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex-shrink-0"
                >
                  <span className="mr-2">{cat.emoji}</span>
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Không tìm thấy bài viết nào</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <span className="text-6xl group-hover:scale-110 transition-transform">
                        {post.thumbnail}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">
                          {categories.find((c) => c.id === post.category)?.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{post.author.avatar}</span>
                          <div>
                            <p className="text-sm font-medium">{post.author.name}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Post Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">
                {categories.find((c) => c.id === selectedPost?.category)?.label}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedPost?.readTime}
              </span>
            </div>
            <DialogTitle className="text-2xl">{selectedPost?.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Author & Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedPost?.author.avatar}</span>
                <div>
                  <p className="font-medium">{selectedPost?.author.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedPost && formatDate(selectedPost.date)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
              <span className="text-8xl">{selectedPost?.thumbnail}</span>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground">{selectedPost?.excerpt}</p>
              <p className="text-muted-foreground">
                {selectedPost?.content}
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-muted-foreground">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="border-t border-border pt-6">
                <h4 className="font-bold mb-4">Bài viết liên quan</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {relatedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedPost(post)}
                    >
                      <span className="text-3xl">{post.thumbnail}</span>
                      <div>
                        <p className="font-medium text-sm line-clamp-2">{post.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{post.readTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Blog;
