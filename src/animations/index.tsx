import gsap, { Power3 } from 'gsap';

export const stagger = (target: gsap.TweenTarget, fromVars: gsap.TweenVars, toVars: gsap.TweenVars) => {
    return gsap.fromTo(
        target,
        { opacity: 0, ...fromVars },
        { opacity: 1, ...toVars, stagger: 0.2, ease: Power3.easeOut }
    );
};