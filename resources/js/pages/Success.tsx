import { useEffect } from 'react';
import { router } from '@inertiajs/react';
import * as NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function Success() {
    useEffect(() => {
        let start : any = null;

        NProgress.start();

        function animateProgress(timestamp : any) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / 3000 * 0.9, 0.9);

            NProgress.set(progress);

            if (elapsed < 3000) {
                requestAnimationFrame(animateProgress);
            }
        }

        requestAnimationFrame(animateProgress);

        const timer = setTimeout(() => {
            NProgress.done();
            router.visit('/dashboard');
        }, 3000);

        return () => {
            clearTimeout(timer);
            NProgress.done();
        };
    }, []);

    return (
        <div className="flex h-screen w-screen justify-center">
            <div className="flex flex-col my-64 items-center">
                <h1 className="text-2xl font-bold text-green-500">Success!</h1>
                <p className="mt-2">Your order has been placed successfully.</p>
                <p className="mt-2 text-gray-500 text-sm">You will be redirected shortly.</p>
            </div>
        </div>
    );
}
