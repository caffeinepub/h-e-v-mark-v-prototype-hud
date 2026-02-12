import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { uiSfx } from '../../audio/uiSfx';

interface ConfirmActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function ConfirmActionModal({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmActionModalProps) {
  const handleConfirm = () => {
    uiSfx.confirmAccept();
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    uiSfx.confirmCancel();
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="confirm-modal">
        <AlertDialogHeader>
          <AlertDialogTitle className="confirm-modal-title">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="confirm-modal-description">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="confirm-modal-footer">
          <AlertDialogCancel onClick={handleCancel} className="confirm-modal-cancel">
            CANCEL
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="confirm-modal-confirm">
            CONFIRM
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
