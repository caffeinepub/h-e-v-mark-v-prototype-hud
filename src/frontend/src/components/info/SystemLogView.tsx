import { useLogStore } from '../../state/systemLog';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SystemLogView() {
  const { entries } = useLogStore();

  const formatTimestamp = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <ScrollArea className="system-log-scroll">
      <div className="system-log">
        {entries.length === 0 ? (
          <div className="log-entry log-empty">No log entries</div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className={`log-entry log-${entry.type}`}>
              <span className="log-timestamp">[{formatTimestamp(entry.timestamp)}]</span>
              <span className="log-type">[{entry.type.toUpperCase()}]</span>
              <span className="log-message">{entry.message}</span>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
}
