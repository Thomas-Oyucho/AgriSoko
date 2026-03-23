import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export default function FlashMessages() {
    const { flash } = usePage().props as any;
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (flash.success) {
            setMessage({ type: 'success', text: flash.success });
            setIsVisible(true);
        } else if (flash.error) {
            setMessage({ type: 'error', text: flash.error });
            setIsVisible(true);
        }
    }, [flash]);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

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
