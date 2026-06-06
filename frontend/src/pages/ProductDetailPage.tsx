import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import Footer from "@/components/Footer";
import { products, getProductsByCategory, type Product } from "@/data/products";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { getJson, postJson } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ReviewResponse = {
  success: boolean;
  data: Array<{
    _id: string;
    rating: number;
    reviewText: string;
    userName: string;
    createdAt: string;
  }>;
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useApp();
  const { toast } = useToast();

  const productId = Number(id);
  const queryClient = useQueryClient();

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const product = useMemo(
    () => products.find((item) => item.id === productId),
    [productId]
  );

  const isValidProduct = Boolean(product && !Number.isNaN(productId));

  useEffect(() => {
    if (!isValidProduct) {
      const timer = setTimeout(() => {
        navigate("/products");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isValidProduct, navigate]);

  const related: Product[] = useMemo(() => {
    if (!product) return [];

    const scopedProducts = getProductsByCategory(product.category).filter(
      (item) => item.id !== product.id
    );

    if (product.subcategory) {
      const sameType = scopedProducts.filter(
        (item) => item.subcategory === product.subcategory
      );
      if (sameType.length > 0) {
        return sameType.slice(0, 4);
      }
    }

    return scopedProducts.slice(0, 4);
  }, [product]);

  const {
    data: reviewsResponse,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useQuery({
    queryKey: ["productReviews", productId],
    queryFn: () => getJson<ReviewResponse>(`/api/products/${productId}/reviews`),
    enabled: isValidProduct,
  });

  const reviewMutation = useMutation({
    mutationFn: () =>
      postJson(`/api/products/${productId}/reviews`, {
        rating: reviewRating,
        reviewText: reviewText.trim(),
        userName: reviewName.trim(),
        userEmail: reviewEmail.trim(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productReviews", productId] });
    },
  });

  const contactMutation = useMutation({
    mutationFn: () =>
      postJson("/api/contact", {
        name: contactName.trim(),
        email: contactEmail.trim(),
        message: contactMessage.trim(),
      }),
  });

  const handleSubmitReview = async () => {
    if (!product) return;

    if (!reviewName.trim() || !reviewEmail.trim() || !reviewText.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide your name, email and review text.",
        variant: "destructive",
      });
      return;
    }

    try {
      await reviewMutation.mutateAsync();
      toast({
        title: "Review submitted",
        description: "Thanks for your feedback!",
        variant: "success",
      });
      setReviewText("");
      setReviewName("");
      setReviewEmail("");
      setReviewRating(5);
    } catch (error) {
      toast({
        title: "Could not submit review",
        description: error instanceof Error ? error.message : "Unexpected error",
        variant: "destructive",
      });
    }
  };

  const handleSendContact = async () => {
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide your name, email and message.",
        variant: "destructive",
      });
      return;
    }

    try {
      await contactMutation.mutateAsync();
      toast({
        title: "Message sent",
        description: "We'll follow up with you soon.",
        variant: "success",
      });
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch (error) {
      toast({
        title: "Could not send message",
        description: error instanceof Error ? error.message : "Unexpected error",
        variant: "destructive",
      });
    }
  };

  if (!isValidProduct) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 pt-24 pb-20">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to products
          </button>
          <p className="text-foreground">Product not found.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Redirecting to products in a few seconds...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div className="bg-card border border-border p-6 flex items-center justify-center group overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x400/cccccc/000000?text=No+Image';
              }}
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-2 flex items-center gap-2">
              {product.subcategory ?? product.category}
              {product.isNew && (
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white">
                  New
                </span>
              )}
            </p>
            <h1 className="text-3xl md:text-4xl font-black uppercase text-foreground mb-4">
              {product.name}
            </h1>
            <p className="text-muted-foreground mb-6">
              Premium quality motorbike wear designed for comfort, protection,
              and style. Available in multiple sizes and colors on request.
            </p>

            <div className="flex items-center gap-6 mb-8">
              <span className="text-3xl font-black text-foreground">
                ${product.price}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToWishlist(product)}
                  className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isInWishlist(product.id)
                        ? "fill-primary text-primary"
                        : "text-foreground"
                    }`}
                  />
                  Add to wishlist
                </button>
              </div>
            </div>

            <button
              onClick={() => addToCart(product)}
              disabled={isInCart(product.id)}
              className={`inline-flex items-center gap-3 px-8 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                isInCart(product.id)
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {isInCart(product.id) ? "In Cart" : "Add to Cart"}
            </button>

            <div className="mt-10 border-t border-border pt-6 space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">SKU:</span>{" "}
                RRG-{product.id.toString().padStart(4, "0")}
              </p>
              <p>
                <span className="font-semibold text-foreground">Category:</span>{" "}
                {product.category}
              </p>
              {product.subcategory && product.subcategory !== product.category && (
                <p>
                  <span className="font-semibold text-foreground">Type:</span>{" "}
                  {product.subcategory}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1.2fr] gap-10 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase text-foreground mb-4">
              Reviews
            </h2>

            <form
              className="space-y-4 max-w-xl"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitReview();
              }}
            >
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Your rating
                </label>
                <div className="flex gap-1 text-2xl">
                  {Array.from({ length: 5 }, (_, index) => {
                    const value = index + 1;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setReviewRating(value)}
                        className={`leading-none transition-colors ${
                          value <= reviewRating
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                        aria-label={`${value} star`}
                      >
                        {"\u2605"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Your review *
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Write your review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    value={reviewEmail}
                    onChange={(e) => setReviewEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" id="remember" className="accent-primary" />
                <label htmlFor="remember">
                  Save my details for the next time I comment.
                </label>
              </div>

              <button
                type="submit"
                disabled={!isValidProduct || reviewMutation.isPending}
                className="px-6 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {reviewMutation.isPending ? "Submitting..." : "Submit"}
              </button>
            </form>

            {reviewsLoading ? (
              <p className="text-sm text-muted-foreground mt-6">Loading reviews...</p>
            ) : reviewsError ? (
              <p className="text-sm text-destructive mt-6">Could not load reviews.</p>
            ) : (
              <div className="space-y-4 mt-6">
                {reviewsResponse?.data?.length ? (
                  reviewsResponse.data.map((review) => (
                    <div
                      key={review._id}
                      className="rounded-md border border-border bg-card p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">
                          {review.userName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm mb-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={
                              index < review.rating
                                ? "text-amber-400"
                                : "text-muted-foreground"
                            }
                          >
                            {"\u2605"}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.reviewText}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    There are no reviews yet. Be the first to review{" "}
                    <span className="font-semibold text-foreground">
                      "{product.name}"
                    </span>
                    .
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase text-foreground mb-4">
              Need help?
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Contact our sales team for sizing, customization, or bulk order
              inquiries.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mb-8">
              <p>
                <span className="font-semibold text-foreground">Phone:</span>{" "}
                +92 300 000 0000
              </p>
              <p>
                <span className="font-semibold text-foreground">Email:</span>{" "}
                info@rogueridergear.com
              </p>
            </div>
            <h3 className="text-sm font-semibold uppercase text-foreground mb-2">
              Quick message
            </h3>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendContact();
              }}
            >
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <textarea
                rows={3}
                placeholder="Your message"
                className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
              />
              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="px-5 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {contactMutation.isPending ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold uppercase text-foreground mb-6">
              Related products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((item) => (
                <div
                  key={item.id}
                  className="group bg-card border border-border overflow-hidden hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-background">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x400/cccccc/000000?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      {item.subcategory ?? item.category}
                    </p>
                    <h3 className="text-xs font-bold uppercase text-foreground mb-1 line-clamp-2">
                      {item.name}
                    </h3>
                    <span className="text-sm font-black text-foreground">
                      ${item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
