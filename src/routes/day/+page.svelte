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
        });
        calendar.render();
    });
</script>

<div class="calendar max-w-full pr-10 max-h-screen"></div>

<style lang="postcss">
    :root {
        --fc-border-color: rgb(42, 41, 59);
    }
</style>
