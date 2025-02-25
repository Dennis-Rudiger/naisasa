export const getPlaceholderImage = (category?: string): string => {
  // Default images by category
  const categoryImages: Record<string, string> = {
    music: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop',
    sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop',
    arts: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop',
    food: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop',
    business: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
    tech: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop',
    virtual: 'https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?w=800&auto=format&fit=crop'
  };

  // Random placeholder images
  const placeholders = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&auto=format&fit=crop'
  ];

  // Return category specific image if available
  if (category && categoryImages[category.toLowerCase()]) {
    return categoryImages[category.toLowerCase()];
  }

  // Return random placeholder
  return placeholders[Math.floor(Math.random() * placeholders.length)];
};

export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, category?: string) => {
  event.currentTarget.src = getPlaceholderImage(category);
};
