import '../styles/globals.css'
import { ThemeProvider } from 'next-themes';
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default App;
