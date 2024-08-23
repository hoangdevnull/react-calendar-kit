import '../globals.css';

// Enable if want to debug on mobile
// import('eruda').then((eruda) => eruda.default.init());

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-background text-foreground">
      <Component {...pageProps} />
    </div>
  );
}
