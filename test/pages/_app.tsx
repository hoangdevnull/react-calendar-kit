import '../globals.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-background text-foreground">
      <Component {...pageProps} />
    </div>
  );
}
