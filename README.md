<div align="center">
  <h1>🏦 NeoBank Modern Core Banking System</h1>
  <p>
    <b>A microservices-based, scalable, and secure modern banking application built with Spring Boot and React.</b>
  </p>
  <p>
    <a href="#türkçe">🇹🇷 Türkçe</a> • <a href="#english">🇬🇧 English</a>
  </p>
  <br/>
</div>

---

<h2 id="english">🇬🇧 English</h2>

### 📖 About The Project

NeoBank is a comprehensive core banking platform designed with a modern microservices architecture. It provides robust backend services for managing customer accounts, transactions, foreign exchange (FX) trades, and wallets. The system ensures high availability, security, and scalability using industry-standard tools and practices.

### 🚀 Key Features

*   **Microservices Architecture:** Independently deployable services communicating securely.
*   **API Gateway:** Centralized routing, load balancing, and global CORS management using Spring Cloud Gateway.
*   **Service Discovery:** Dynamic service registration and discovery via Netflix Eureka.
*   **Authentication & Security:** JWT (JSON Web Token) based stateless authentication, role-based access control (Admin, Manager, Employee, Customer) using Spring Security.
*   **Payment Orchestration:** Comprehensive transaction handling including deposits, withdrawals, internal/external transfers, and FX trading.
*   **Resilience & Fault Tolerance:** Circuit breaking implemented with Resilience4j to prevent cascading failures.
*   **Message Broker Integration:** Asynchronous event-driven communication (e.g., notifications) using RabbitMQ.
*   **Local Mail Server:** Integrated MailHog for testing email notifications without spamming real users.
*   **Containerized Deployment:** Fully Dockerized environment (Frontend, Backend, DB, Message Broker, Discovery) managed via `docker-compose`.
*   **Modern Frontend:** Responsive and interactive user interfaces built with React, Vite, and Tailwind CSS.

### 🏗️ Technology Stack

**Backend:**
*   Java 21
*   Spring Boot 3.3.0
*   Spring Cloud (Gateway, Eureka, OpenFeign, LoadBalancer)
*   Spring Security & JWT
*   Spring Data JPA & Hibernate
*   MySQL 8.0
*   RabbitMQ
*   Resilience4j
*   Micrometer Tracing & Zipkin (Observability)
*   MailHog (SMTP Testing)

**Frontend:**
*   React 19
*   Vite
*   Tailwind CSS
*   Lucide React (Icons)
*   Axios

**DevOps & Infrastructure:**
*   Docker & Docker Compose
*   Tailscale (Secure VPN/Network for remote testing)

### 📦 Project Structure

The repository consists of the following main components:

*   **`discovery-server/`**: Netflix Eureka Server acting as the service registry.
*   **`api-gateway/`**: Spring Cloud Gateway handling routing, CORS, and load balancing.
*   **`paymentService/`**: The core banking engine managing users, wallets, transactions, security, and rabbitmq consumers.
*   **`frontend/`**: The React-based client application featuring role-based dashboards (Customer, Admin, Manager).
*   **`docker-compose.yml`**: Orchestrates the entire infrastructure including MySQL, RabbitMQ, MailHog, and all microservices.

### 🛠️ Getting Started

#### Prerequisites
*   [Docker](https://www.docker.com/) and Docker Compose
*   [Java 21](https://jdk.java.net/21/) (For local development)
*   [Node.js](https://nodejs.org/) 20+ (For local frontend development)
*   [Maven](https://maven.apache.org/)

#### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/BankingProject.git
    cd BankingProject
    ```

2.  **Build the backend services:**
    ```bash
    mvn clean package -DskipTests
    ```

3.  **Start the entire stack using Docker Compose:**
    ```bash
    docker-compose up --build -d
    ```

4.  **Access the applications:**
    *   Frontend UI: `http://localhost:5173`
    *   API Gateway: `http://localhost:8080`
    *   Eureka Dashboard: `http://localhost:8761`
    *   MailHog (Email UI): `http://localhost:8025`
    *   RabbitMQ Management: `http://localhost:15672`

#### Default Test Accounts
*   **Customer:** `ornek@neobank.com.tr` / Password: `123`
*   **Admin:** `admin@neobank.com.tr` / Password: `123`

---

<h2 id="türkçe">🇹🇷 Türkçe</h2>

### 📖 Proje Hakkında

NeoBank, modern mikroservis mimarisi ile tasarlanmış kapsamlı bir temel bankacılık platformudur. Müşteri hesaplarını, para transferlerini, döviz (FX) işlemlerini ve cüzdanları yönetmek için güçlü arka uç (backend) servisleri sunar. Sistem, endüstri standartlarındaki araçları ve uygulamaları kullanarak yüksek erişilebilirlik, güvenlik ve ölçeklenebilirlik sağlar.

### 🚀 Temel Özellikler

*   **Mikroservis Mimarisi:** Güvenli iletişim kuran, bağımsız olarak dağıtılabilen servisler.
*   **API Gateway:** Spring Cloud Gateway kullanılarak merkezi yönlendirme, yük dengeleme (load balancing) ve global CORS yönetimi.
*   **Service Discovery (Servis Keşfi):** Netflix Eureka aracılığıyla dinamik servis kaydı ve keşfi.
*   **Kimlik Doğrulama ve Güvenlik:** Spring Security kullanılarak JWT (JSON Web Token) tabanlı durumsuz (stateless) kimlik doğrulama, role dayalı erişim kontrolü (Admin, Müdür, Personel, Müşteri).
*   **Ödeme Orkestrasyonu (Payment Orchestration):** Para yatırma, çekme, kurum içi/dışı transferler ve döviz alım/satım işlemlerini kapsayan işlem yönetimi.
*   **Hata Toleransı (Resilience):** Hataların zincirleme büyümesini engellemek için Resilience4j ile uygulanan Circuit Breaker (Devre Kesici) yapısı.
*   **Mesaj Kuyruğu Entegrasyonu:** RabbitMQ kullanılarak asenkron olay güdümlü (event-driven) iletişim (örneğin bildirimler).
*   **Yerel E-posta Sunucusu:** Gerçek kullanıcıları spamlemeden e-posta bildirimlerini test etmek için entegre MailHog.
*   **Konteyner Mimarisi (Docker):** Tüm ortamın (Frontend, Backend, DB, RabbitMQ, Discovery) `docker-compose` ile yönetildiği tam Dockerize edilmiş yapı.
*   **Modern Frontend:** React, Vite ve Tailwind CSS ile oluşturulmuş, duyarlı (responsive) ve etkileşimli kullanıcı arayüzleri.

### 🏗️ Teknoloji Yığını

**Backend:**
*   Java 21
*   Spring Boot 3.3.0
*   Spring Cloud (Gateway, Eureka, OpenFeign, LoadBalancer)
*   Spring Security & JWT
*   Spring Data JPA & Hibernate
*   MySQL 8.0
*   RabbitMQ
*   Resilience4j
*   Micrometer Tracing & Zipkin (Gözlemlenebilirlik)
*   MailHog (SMTP Testi)

**Frontend:**
*   React 19
*   Vite
*   Tailwind CSS
*   Lucide React (İkonlar)
*   Axios

**DevOps ve Altyapı:**
*   Docker & Docker Compose
*   Tailscale (Uzaktan test için güvenli VPN/Ağ)

### 📦 Proje Yapısı

Depo (repository) aşağıdaki ana bileşenlerden oluşmaktadır:

*   **`discovery-server/`**: Servis kayıt merkezi olarak görev yapan Netflix Eureka Sunucusu.
*   **`api-gateway/`**: Yönlendirme, CORS ve yük dengeleme işlemlerini yürüten Spring Cloud Gateway.
*   **`paymentService/`**: Kullanıcıları, cüzdanları, işlemleri, güvenliği ve RabbitMQ tüketicilerini (consumers) yöneten temel bankacılık motoru.
*   **`frontend/`**: Role dayalı gösterge panelleri (Müşteri, Admin, Müdür) içeren React tabanlı istemci (client) uygulaması.
*   **`docker-compose.yml`**: MySQL, RabbitMQ, MailHog ve tüm mikroservisleri içeren tüm altyapıyı koordine eder.

### 🛠️ Başlangıç

#### Gereksinimler
*   [Docker](https://www.docker.com/) ve Docker Compose
*   [Java 21](https://jdk.java.net/21/) (Yerel geliştirme için)
*   [Node.js](https://nodejs.org/) 20+ (Yerel frontend geliştirmesi için)
*   [Maven](https://maven.apache.org/)

#### Kurulum ve Çalıştırma

1.  **Projeyi klonlayın:**
    ```bash
    git clone https://github.com/yourusername/BankingProject.git
    cd BankingProject
    ```

2.  **Backend servislerini derleyin (build):**
    ```bash
    mvn clean package -DskipTests
    ```

3.  **Tüm sistemi Docker Compose kullanarak başlatın:**
    ```bash
    docker-compose up --build -d
    ```

4.  **Uygulamalara erişim sağlayın:**
    *   Frontend Arayüzü: `http://localhost:5173`
    *   API Gateway: `http://localhost:8080`
    *   Eureka Gösterge Paneli: `http://localhost:8761`
    *   MailHog (E-posta Arayüzü): `http://localhost:8025`
    *   RabbitMQ Yönetim Paneli: `http://localhost:15672`

#### Varsayılan Test Hesapları
*   **Müşteri (Customer):** `ornek@neobank.com.tr` / Şifre: `123`
*   **Yönetici (Admin):** `admin@neobank.com.tr` / Şifre: `123`
