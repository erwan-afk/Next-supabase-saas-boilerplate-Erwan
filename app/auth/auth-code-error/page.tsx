// app/auth/auth-code-error/page.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const AuthCodeErrorPage: React.FC = () => {
  const params = useSearchParams();
  const code = params.get("code") ?? "No code found";

  return (
    <div>
      <h1>Authentication Code Error</h1>
      <p>An error occurred during authentication:</p>
      <p>{code}</p>
      {/* You can add more information or instructions here */}
    </div>
  );
};

export default AuthCodeErrorPage;
