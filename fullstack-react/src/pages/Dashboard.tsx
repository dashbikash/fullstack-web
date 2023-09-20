import { Card, Title } from "@mantine/core";

function Dashboard() {
    return (
        <>
        <Title>Dashboard</Title>
            <Card shadow="sm" padding="sm" radius="sm" withBorder>

                <Card.Section>
                    Chart
                </Card.Section>
            </Card>
        </>
    );
}

export default Dashboard;