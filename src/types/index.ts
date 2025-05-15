
export interface RecommendationItem {
  id: string;
  text: string;
  feedback?: 'liked' | 'disliked';
}
