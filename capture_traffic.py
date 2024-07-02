from scapy.all import sniff, IP
import requests
import datetime

# Supabase credentials
supabase_api_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2d3pidmlpZ3Nvbml3a2djeW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MDA4MTIsImV4cCI6MjAzNTQ3NjgxMn0.eDuqdrGpBvsq2ToPabJm7ZTONYKU_Y0VYA_xQhfK04c'
supabase_auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2d3pidmlpZ3Nvbml3a2djeW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MDA4MTIsImV4cCI6MjAzNTQ3NjgxMn0.eDuqdrGpBvsq2ToPabJm7ZTONYKU_Y0VYA_xQhfK04c'

# Supabase API endpoint
api_url = 'https://lvwzbviigsoniwkgcymf.supabase.co/rest/v1/packets'
headers = {
    'apikey': supabase_api_key,
    'Authorization': f'Bearer {supabase_auth_token}',
    'Content-Type': 'application/json'
}

# Global variables for statistics
total_paquetes = 0
tipo_protocolo = {}
origen_contador = {}
destino_contador = {}


def process_paquete(paquete):
    global total_paquetes, tipo_protocolo, origen_contador, destino_contador

    if IP in paquete:
        total_paquetes += 1

        # Extract packet details
        protocolo = paquete[IP].proto
        origen_ip = paquete[IP].src
        destino_ip = paquete[IP].dst

        # Prepare payload for insertion
        payload = {
            'timestamp': datetime.datetime.now().isoformat(),  # Correct usage of datetime
            'protocol': protocolo,
            'source_ip': origen_ip,
            'destination_ip': destino_ip
        }

        # Send POST request to insert packet data
        try:
            response = requests.post(api_url, headers=headers, json=payload)
            if response.status_code == 201:
                print(f"Packet data inserted successfully: {payload}")
            else:
                print(f"Failed to insert packet data. Status code: {response.status_code}")
        except Exception as e:
            print(f"Error inserting packet data: {e}")

# Start capturing packets
print("Starting packet capture...")
sniff(iface="enp0s3", prn=process_paquete, store=0)