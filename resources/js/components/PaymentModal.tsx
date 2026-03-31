import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Smartphone, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStatusSelected: (status: 'paid' | 'failed') => void;
    totalAmount: number;
    phoneNumber: string;
}

export function PaymentModal({ isOpen, onClose, onStatusSelected, totalAmount, phoneNumber }: PaymentModalProps) {
    const [step, setStep] = useState<'request' | 'waiting'>('request');

    useEffect(() => {
        if (!isOpen) {
            setStep('request');
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-slate-50">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-emerald-700">
                        <Smartphone className="w-5 h-5" />
                        M-Pesa STK Push Simulation
                    </DialogTitle>
                    <DialogDescription>
                        Simulating the STK push that would be sent to your phone.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center py-8">
                    {step === 'request' ? (
                        <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-slate-200 w-64 h-96 relative flex flex-col items-center justify-center text-center">
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-200 rounded-full" />

                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png"
                                alt="M-Pesa"
                                className="w-20 mb-6"
                            />

                            <p className="font-bold text-sm mb-2">STK Push Sent</p>
                            <p className="text-xs text-gray-500 mb-6">
                                Pay KES {totalAmount.toLocaleString()} to AgriSoko
                            </p>

                            <Button
                                onClick={() => setStep('waiting')}
                                className="bg-[#41B649] hover:bg-[#39a041] text-white w-full rounded-full"
                            >
                                Simulate Receive
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-[#41B649] p-6 rounded-3xl shadow-xl border-4 border-[#2d8233] w-64 h-96 relative flex flex-col items-center justify-between text-white py-12">
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full" />

                            <div className="text-center">
                                <h3 className="font-bold text-lg mb-4">M-PESA</h3>
                                <div className="bg-white/20 p-3 rounded-lg text-sm mb-6">
                                    Do you want to pay KES {totalAmount.toLocaleString()} to AgriSoko?
                                    Enter M-Pesa PIN:
                                </div>
                                <div className="flex justify-center gap-2 mb-8">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-3 h-3 rounded-full bg-white/50" />
                                    ))}
                                </div>
                            </div>

                            <div className="w-full space-y-3">
                                <Button
                                    onClick={() => onStatusSelected('paid')}
                                    className="w-full bg-white text-[#41B649] hover:bg-slate-100 font-bold"
                                >
                                    Simulate Success
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => onStatusSelected('failed')}
                                    className="w-full border-white text-white hover:bg-white/10"
                                >
                                    Simulate Failure
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="sm:justify-center">
                    <p className="text-[10px] text-gray-400 text-center italic">
                        This is a mockup for simulation purposes. No real money will be transferred.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
