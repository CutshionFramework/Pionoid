import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppTasks from '../app-tasks';
import AppOrderTimeline from '../app-order-timeline';
import AppWidgetSummary from '../app-widget-summary';


// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      
        <Grid xs={12} md={6} lg={8}>
          <img src="/assets/images/jaka%20robot%20arm.png" alt="JAKA robot arm" />
        </Grid>

        <Grid container spacing={3}>
        <Grid xs={14} sm={8} md={6}>
          <AppWidgetSummary
            title="IP Address"
            total={1}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={14} sm={8} md={6}>
          <AppWidgetSummary
            title="Save Position"
            total={2}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={11} sm={6} md={4}>
          <AppWidgetSummary
            title="Tool 1"
            total={3}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        
        <Grid xs={11} sm={6} md={4}>
          <AppWidgetSummary
            title="Tool 2"
            total={4}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={11} sm={6} md={4}>
          <AppWidgetSummary
            title="Stop"
            total={5}
            color="Run Project"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={10} md={4} lg={6}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Activate robot arm' },
              { id: '2', name: 'Manual move' },
              { id: '3', name: 'Use web tools' },
              { id: '4', name: 'Save positions' },
              { id: '5', name: 'Run project ' },
            ]}
          />
        </Grid>


        <Grid xs={13} md={7} lg={6}>
          <AppOrderTimeline
            title="Process"
            list={[...Array(3)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                'Connect to robot arm',
                'Move and Save different positions',
                'Execute your robot automation project',
              ][index],
              type: `order${index + 1}`,
              text: [
                ['2 min aprox'],
                ['4 min aprox'],
                ['1 sec'],
              ][index],
            }))}  
          />
        </Grid>



        </Grid>
    </Container>
  );
}
