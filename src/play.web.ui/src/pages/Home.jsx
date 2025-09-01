import React from 'react'

function Home() {
    return (
        <div>
            <br />
            <h1>Play Economy</h1>
            <p>Welcome to Play Economy website, a cloud native virtual game items control system.</p>
            <p>
                To get started, you can:
                <ul>
                    <li>Manage the <a href="/catalog" target="_blank">Catalog</a></li>
                    <li>Check a user's <a href="/inventory" target="_blank">Inventory</a></li>
                </ul>
            </p>
            <p>
                You can also:
                <ul>
                    <li>Manage the <a href="http://localhost:15672/" target="_blank">message queues</a></li>
                    <li>Explore the Open API documentation:
                        <ul>
                            <li>
                                <a href="http://localhost:5005/swagger/index.html" target="_blank">Inventory</a>
                            </li>
                            <li>
                                <a href="http://localhost:5001/swagger/index.html" target="_blank">Category</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </p>
            <p>
                This website was built with:
                <ul>
                    <li><a href="https://dotnet.microsoft.com/en-us/apps/aspnet" target="_blank">ASP.NET Core</a> and <a href="https://learn.microsoft.com/en-us/dotnet/csharp/" target="_blank">C#</a> for cross platform server-side code</li>
                    <li><a href="https://www.docker.com/" target="_blank">Docker</a> for services containerization</li>
                    <li><a href="https://www.mongodb.com/" target="_blank">MongoDB</a> for database storage</li>
                    <li><a href="https://www.rabbitmq.com/" target="_blank">RabbitMQ</a> and <a href="https://masstransit.io/" target="_blank">MassTransit</a> for message-based asynchronous communication</li>
                    <li><a href="https://react.dev/" target="_blank">React</a> for client-side rendering and <a href="https://mui.com/material-ui/" target="_blank">MaterialUI</a> for layout and styling</li>
                </ul>
            </p>
        </div>
    )
}

export default Home