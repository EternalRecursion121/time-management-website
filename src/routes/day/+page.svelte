<script lang="ts">
    import { Calendar } from '@fullcalendar/core';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import listPlugin from '@fullcalendar/list';
    import interactionPlugin from '@fullcalendar/interaction';
    import momentPlugin from '@fullcalendar/moment';
    import googleCalendarPlugin from '@fullcalendar/google-calendar';
    import scrollgridPlugin from '@fullcalendar/scrollgrid';
    import { onMount } from 'svelte';
    import timegrid from '@fullcalendar/timegrid';
    onMount(() => {
        const calendar = new Calendar(document.querySelector('.calendar'), {
            plugins: [
                timeGridPlugin,
                interactionPlugin,
                scrollgridPlugin,
                googleCalendarPlugin
            ],
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            editable: true,
            nowIndicator: true,
            droppable: true,
            dateClick: (info) => {
                const title = prompt('Enter event title:');
                if (title) {
                    calendar.addEvent({
                        title: title,
                        start: info.dateStr
                    });
                }
            },
            initialView: 'timeGrid',
            views: {
                timeGrid: {
                    type: timegrid,
                    duration: { days: 1 },
                },
                jeff: {
                    type: timegrid,
                    duration: { days: 3 },
                }
            }
        });
        calendar.render();
    });
</script>

<div class="h-screen flex flex-col">
    <div class="flex flex-row">
        <div class="calendar max-w-full max-h-full w-[80%]"></div>
        <div class="outline outline-1 m-0 p-0 w-[20%]">Tasks</div>
    </div>
    <div class="outline outline-gray-900 outline-1 h-8 p-2 col-span-2">HELLO</div>
</div>

<style lang="postcss">
    :root {
        --fc-small-font-size: .85em;
        --fc-page-bg-color: transparent;
        --fc-neutral-bg-color: rgba(0, 0, 0, 0.6);
        --fc-neutral-text-color: #cccfe9;
        --fc-border-color: rgba(12, 12, 12, 0.4);

        --fc-button-text-color: #ffffff;
        --fc-button-bg-color: #4a96b8;
        --fc-button-border-color: #4a96b8;
        --fc-button-hover-bg-color: #3c7d9f;
        --fc-button-hover-border-color: #376d8d;
        --fc-button-active-bg-color: #2d5c79;
        --fc-button-active-border-color: #264c65;

        --fc-event-bg-color: #63a0cc;
        --fc-event-border-color: #63a0cc;
        --fc-event-text-color: #ffffff;
        --fc-event-selected-overlay-color: rgba(0, 0, 0, 0.25);

        --fc-more-link-bg-color: rgba(255, 255, 255, 0.8);
        --fc-more-link-text-color: inherit;

        --fc-event-resizer-thickness: 8px;
        --fc-event-resizer-dot-total-width: 8px;
        --fc-event-resizer-dot-border-width: 1px;

        --fc-non-business-color: rgba(255, 255, 255, 0.3);
        --fc-bg-event-color: rgb(143, 223, 130);
        --fc-bg-event-opacity: 0.3;
        --fc-highlight-color: rgba(188, 232, 241, 0.3);
        --fc-today-bg-color: rgba(255, 220, 40, 0.15);
        --fc-now-indicator-color: rgb(235, 5, 82);
    }

    .fc .fc-daygrid-event {
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .fc .fc-button {
        border-radius: 5px;
    }

    .fc .fc-button:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>