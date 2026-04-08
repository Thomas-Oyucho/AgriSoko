import Swal from 'sweetalert2';

const isDark = () => document.documentElement.classList.contains('dark');

const commonConfig = () => ({
    background: isDark() ? 'oklch(0.145 0 0)' : 'oklch(1 0 0)',
    color: isDark() ? 'oklch(0.985 0 0)' : 'oklch(0.145 0 0)',
    confirmButtonColor: 'oklch(0.486 0.237 155.25)', // success color
    cancelButtonColor: 'oklch(0.577 0.245 27.325)', // destructive color
    customClass: {
        popup: 'rounded-xl border border-border shadow-lg',
        title: 'font-bold text-xl',
        confirmButton: 'px-6 py-2 rounded-lg font-medium',
        cancelButton: 'px-6 py-2 rounded-lg font-medium',
    },
});

export const showSwalError = (title: string, text: string) => {
    return Swal.fire({
        ...commonConfig(),
        title,
        text,
        icon: 'error',
    });
};

export const showSwalConfirm = (title: string, text: string) => {
    return Swal.fire({
        ...commonConfig(),
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    });
};

export default Swal;
