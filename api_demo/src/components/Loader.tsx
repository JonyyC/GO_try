import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loader(){

    return(
        <div className="loader-container">
            <DotLottieReact className="loader"
                src="/animations/Animation - 1748195659228.lottie"
                loop
                autoplay
            />
        </div>

    )
}

