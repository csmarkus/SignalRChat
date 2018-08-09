import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'ClientApp';

    public hubConnection: HubConnection;
    public messages: string[] = [];
    public message: string;

    ngOnInit() {
        let builder = new HubConnectionBuilder();
        this.hubConnection = builder.withUrl('/chathub').build();

        this.hubConnection.on("ReceiveMessage", (message) => {
            this.messages.push(message);
        });

        this.hubConnection.start();
    }

    SendMessage() {
        this.hubConnection.invoke("SendMessage", this.message);
        this.message = "";
    }
}
