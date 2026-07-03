"use client";

interface AuthHeaderProps {
  title: string;
  description: string;
}

// ==========================================
// Authentication Header
// ==========================================
const AuthHeader = ({
  title,
  description,
}: AuthHeaderProps) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-white">
        {title}
      </h1>

      <p className="mt-4 text-sm leading-6 text-slate-400">
        {description}
      </p>

    </div>
  );
};

export default AuthHeader;