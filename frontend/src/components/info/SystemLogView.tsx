import { useLogStore } from '../../state/systemLog';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SystemLogView() {
  const { entries } = useLogStore();

  return (
    <ScrollArea className="system-log-scroll">
      <div className="system-log">
        {entries.length === 0 ? (
          <div className="log-entry log-empty">No log entries</div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className={`log-entry log-${entry.type}`}>
              <span className="log-timestamp">[{entry.timestamp}]</span>
              <span className="log-type">[{entry.type.toUpperCase()}]</span>
              <span className="log-message">{entry.message}</span>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
}
