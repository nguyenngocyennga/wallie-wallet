import * as React from 'react';
import { format } from 'date-fns';
import { Calendar1Icon } from 'lucide-react';
import { SelectSingleEventHandler } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { 
    Popover,
    PopoverContent,
    PopoverTrigger,
 } from './ui/popover';

type Props = {
    value?: Date;
    onChange?: SelectSingleEventHandler;
    disabled?: boolean;
}

export const DatePicker = ({
    value,
    onChange,
    disabled,
}: Props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal pointer-events-auto",
                        !value && "text-muted-foreground"
                    )}
                    // className={cn("p-3 pointer-events-auto", className)}
                >
                    <Calendar1Icon className='size-4'/>
                    {value ? format(value, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={disabled}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                />
            </PopoverContent>
        </Popover>
    );
};
