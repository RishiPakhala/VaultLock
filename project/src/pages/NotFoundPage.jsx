import React from 'react';
import { Link } from 'react-router-dom';
import { Lock as LockOff } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center py-12 text-center animate-fade-in">
      <LockOff className="h-24 w-24 text-gray-400" />
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        404 - Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-lg text-gray-600 dark:text-gray-300">
        Oops! The page you're looking for seems to be locked away or doesn't exist.
      </p>
      <div className="mt-8">
        <Link to="/" className="btn btn-primary inline-flex items-center px-8 py-3">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
