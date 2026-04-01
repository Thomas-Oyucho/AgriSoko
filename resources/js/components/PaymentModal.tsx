import { Smartphone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStatusSelected: (status: 'paid' | 'failed') => void;
    totalAmount: number;
    phoneNumber?: string;
}

export function PaymentModal({ isOpen, onClose, onStatusSelected, totalAmount }: PaymentModalProps) {
    const [step, setStep] = useState<'request' | 'waiting'>('request');
    const [prevOpen, setPrevOpen] = useState(isOpen);

    if (isOpen !== prevOpen) {
        setPrevOpen(isOpen);
        if (!isOpen) {
            setStep('request');
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-card">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-success">
                        <Smartphone className="w-5 h-5" />
                        M-Pesa STK Push Simulation
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Simulating the STK push that would be sent to your phone.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center py-8">
                    {step === 'request' ? (
                        <div className="bg-background p-6 rounded-3xl shadow-xl border-4 border-border w-64 h-96 relative flex flex-col items-center justify-center text-center">
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-muted rounded-full" />

                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png"
                                alt="M-Pesa"
                                className="w-20 mb-6"
                            />

                            <p className="font-bold text-sm mb-2 text-foreground">STK Push Sent</p>
                            <p className="text-xs text-muted-foreground mb-6">
                                Pay KES {totalAmount.toLocaleString()} to AgriSoko
                            </p>

                            <Button
                                onClick={() => setStep('waiting')}
                                className="bg-success hover:bg-success/90 text-success-foreground w-full rounded-full"
                            >
                                Simulate Receive
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-success p-6 rounded-3xl shadow-xl border-4 border-success/80 w-64 h-96 relative flex flex-col items-center justify-between text-success-foreground py-12">
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-success-foreground/30 rounded-full" />

                            <div className="text-center">
                                <h3 className="font-bold text-lg mb-4">M-PESA</h3>
                                <div className="bg-success-foreground/20 p-3 rounded-lg text-sm mb-6">
                                    Do you want to pay KES {totalAmount.toLocaleString()} to AgriSoko?
                                    Enter M-Pesa PIN:
                                </div>
                                <div className="flex justify-center gap-2 mb-8">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-3 h-3 rounded-full bg-success-foreground/50" />
                                    ))}
                                </div>
                            </div>

                            <div className="w-full space-y-3">
                                <Button
                                    onClick={() => onStatusSelected('paid')}
                                    className="w-full bg-success-foreground text-success hover:bg-success-foreground/90 font-bold"
                                >
                                    Simulate Success
                                </Button>
                                <Button
                                    onClick={() => onStatusSelected('failed')}
                                    className="w-full bg-destructive/80 text-white hover:bg-destructive font-bold"
                                >
                                    Simulate Failure
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="sm:justify-center">
                    <p className="text-[10px] text-muted-foreground/70 text-center italic">
                        This is a mockup for simulation purposes. No real money will be transferred.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
