import { usePage } from '@inertiajs/react';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { SharedProps } from '@/types';

interface FlashProps {
    success: string | null;
    error: string | null;
}

export default function FlashMessages() {
    const { flash } = usePage<SharedProps>().props;
    const [isVisible, setIsVisible] = useState(false);
    const [prevFlash, setPrevFlash] = useState<FlashProps | undefined>(flash as FlashProps);

    if (flash?.success !== prevFlash?.success || flash?.error !== prevFlash?.error) {
        setPrevFlash(flash as FlashProps);
        setIsVisible(true);
    }

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isVisible) {
            timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isVisible]);

    const message = flash?.success
        ? { type: 'success' as const, text: flash.success }
        : flash?.error
          ? { type: 'error' as const, text: flash.error }
          : null;

    if (!isVisible || !message) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm animate-in fade-in slide-in-from-bottom-5">
            <Alert variant={message.type === 'success' ? 'default' : 'destructive'} className={message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : ''}>
                {message.type === 'success' ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4" />}
                <AlertTitle>{message.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                <AlertDescription>
                    {message.text}
                </AlertDescription>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 p-1 rounded-md hover:bg-black/5"
                >
                    <X className="h-4 w-4" />
                </button>
            </Alert>
        </div>
    );
}
