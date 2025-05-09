import BlogCard from "../BlogCard";

const ExploreSection = () => {
  return (
    <div className="px-10 my-10 grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-10">
      {Array.from({ length: 5 }, (_, i) => i).map((ele) => (
        <BlogCard key={ele} />
      ))}
    </div>
  );
};

export default ExploreSection;
