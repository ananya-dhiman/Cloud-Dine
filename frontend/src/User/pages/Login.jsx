import React from 'react';

// onToggle: A function to switch to the signup view.
const Login = ({ onToggle }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements['login-email'].value;

    // Hardcoded emails for specific navigation
    const kitchenOwnerEmail = 'kitchen@clouddine.com';
    const userEmail = 'user@clouddine.com';

    // Check the entered email and navigate to the appropriate page
    if (email === kitchenOwnerEmail) {
      console.log('Redirecting to kitchen dashboard...');
      window.location.assign('/kitchen');
    } else if (email === userEmail) {
      console.log('Redirecting to user page...');
      window.location.assign('/');
    } else {
      // Default navigation for any other user
      console.log('Default redirect to user page...');
      window.location.assign('/');
    }
  };

  return (
    <div className="bg-card text-card-foreground max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      <section>
        <h2 className="text-3xl font-bold text-center">Welcome back</h2>
      </section>

      <section className="mt-10">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6 pt-3 rounded bg-input">
            <label className="block text-muted-foreground text-sm font-bold mb-2 ml-3" htmlFor="login-email">Email or Username</label>
            <input type="text" id="login-email" placeholder="Enter your email or username" className="bg-transparent rounded w-full focus:outline-none border-b-4 border-border focus:border-primary transition duration-500 px-3 pb-3" required />
          </div>
          <div className="mb-6 pt-3 rounded bg-input">
            <label className="block text-muted-foreground text-sm font-bold mb-2 ml-3" htmlFor="login-password">Password</label>
            <input type="password" id="login-password" placeholder="Enter your password" className="bg-transparent rounded w-full focus:outline-none border-b-4 border-border focus:border-primary transition duration-500 px-3 pb-3" required />
          </div>
          <div className="text-right mb-6">
            <a href="#" className="text-sm font-semibold text-muted-foreground hover:text-foreground hover:underline">
              Forgot Password?
            </a>
          </div>
          <button className="bg-primary hover:opacity-90 text-primary-foreground font-bold py-3 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">
            Log In
          </button>
        </form>
      </section>

      <div className="relative my-8 h-px bg-border">
        <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
          <span className="bg-card px-4 text-xs text-muted-foreground uppercase">Or continue with</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="w-full flex justify-center items-center gap-2 border border-border font-semibold py-3 rounded-lg hover:bg-accent transition-colors">
          Continue with Google
        </button>
      </div>

      <div className="text-center text-muted-foreground mt-8">
        Don't have an account?
        <button onClick={onToggle} className="font-semibold text-foreground hover:underline ml-1">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
