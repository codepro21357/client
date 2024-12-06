interface BadgeProps {
  content: number;
  children: React.ReactNode;
}
const Badge = ({ content, children }: BadgeProps) => {
  return (
    <div className="relative">
      <div
        className="bg-red-500 text-[10px]  w-[12px] h-[12px] rounded-full flex 
          justify-center items-center absolute top-[-5px] right-[-8px] "
      >
        {content}
      </div>
      {children}
    </div>
  );
};

export default Badge;
