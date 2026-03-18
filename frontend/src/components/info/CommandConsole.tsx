import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { executeCommand } from '../../lib/commands';
import { useLogStore } from '../../state/systemLog';
import { uiSfx } from '../../audio/uiSfx';

export function CommandConsole() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; response: string }>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addEntry } = useLogStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim();
    const response = executeCommand(command);
    
    setHistory(prev => [...prev, { command, response }]);
    addEntry('command', `Executed: ${command}`);
    setInput('');
    setHistoryIndex(-1);
    uiSfx.consoleSubmit();

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commands = history.map(h => h.command);
      if (commands.length > 0) {
        const newIndex = historyIndex < commands.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commands[commands.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const commands = history.map(h => h.command);
        setInput(commands[commands.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="command-console">
      <ScrollArea className="console-output" ref={scrollRef}>
        <div className="console-history">
          {history.map((item, idx) => (
            <div key={idx} className="console-entry">
              <div className="console-command">
                <span className="console-prompt">&gt;</span> {item.command}
              </div>
              <div className="console-response">{item.response}</div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="console-input-form">
        <span className="console-prompt">&gt;</span>
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type /help for commands..."
          className="console-input"
          autoComplete="off"
        />
        <Button type="submit" size="sm" className="console-submit">
          EXEC
        </Button>
      </form>
    </div>
  );
}
