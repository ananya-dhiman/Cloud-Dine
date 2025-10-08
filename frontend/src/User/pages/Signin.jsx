
import React from 'react';

// onSignUpSuccess: A function to call when signup is "successful".
// onToggle: A function to switch to the login view.
const SignUp = ({ onSignUpSuccess, onToggle }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements['signup-name'].value;
    // In a real app, you'd handle form submission to a server here.
    console.log('Signup successful');
    onSignUpSuccess(name); // Pass the user's name to the parent
  };

  return (
    <div className="bg-card text-card-foreground max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      <section>
        <h2 className="text-3xl font-bold text-center">Create your account</h2>
      </section>

      <section className="mt-10">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6 pt-3 rounded bg-input">
            <label className="block text-muted-foreground text-sm font-bold mb-2 ml-3" htmlFor="signup-name">Name</label>
            <input type="text" id="signup-name" placeholder="Enter your name" className="bg-transparent rounded w-full focus:outline-none border-b-4 border-border focus:border-primary transition duration-500 px-3 pb-3" required />
          </div>
          <div className="mb-6 pt-3 rounded bg-input">
            <label className="block text-muted-foreground text-sm font-bold mb-2 ml-3" htmlFor="signup-email">Email</label>
            <input type="email" id="signup-email" placeholder="Enter your email" className="bg-transparent rounded w-full focus:outline-none border-b-4 border-border focus:border-primary transition duration-500 px-3 pb-3" required />
          </div>
          <div className="mb-6 pt-3 rounded bg-input">
            <label className="block text-muted-foreground text-sm font-bold mb-2 ml-3" htmlFor="signup-phone">Phone Number</label>
            <input type="tel" id="signup-phone" placeholder="Enter your phone number" className="bg-transparent rounded w-full focus:outline-none border-b-4 border-border focus:border-primary transition duration-500 px-3 pb-3" required />
          </div>
          <div className="mb-6 pt-3 rounded bg-input">
            <label className="block text-muted-foreground text-sm font-bold mb-2 ml-3" htmlFor="signup-password">Password</label>
            <input type="password" id="signup-password" placeholder="Enter your password" className="bg-transparent rounded w-full focus:outline-none border-b-4 border-border focus:border-primary transition duration-500 px-3 pb-3" required />
          </div>
          <button className="bg-primary hover:opacity-90 text-primary-foreground font-bold py-3 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">
            Sign Up
          </button>
        </form>
      </section>

      <div className="relative my-8 h-px bg-border">
        <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
          <span className="bg-card px-4 text-xs text-muted-foreground uppercase">Or sign up with</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="w-full flex justify-center items-center gap-2 border border-border font-semibold py-3 rounded-lg hover:bg-accent transition-colors">
          Continue with Google
        </button>
      </div>

      <div className="text-center text-muted-foreground mt-8">
        Already have an account?
        <button onClick={onToggle} className="font-semibold text-foreground hover:underline ml-1">
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;