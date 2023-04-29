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
        --fc-border-color: rgb(42, 41, 59);
    }
</style>
