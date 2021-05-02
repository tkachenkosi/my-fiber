// изучение fiber
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"

	// "github.com/gofiber/fiber"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/mustache"
	"github.com/rs/xid"

	"hash/fnv"
)

type Kadry struct {
	Id  int     `json:"id"`
	Rem string  `json:"rem"`
	Sum float64 `json:"sum"`
}

var logger *log.Logger

func main() {
	r1() // расчет кеш
	log_file()

	f, err := os.OpenFile("./base/text.log",
		os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Println(err)
	}
	defer f.Close()

	logger = log.New(f, "мой лог: ", log.LstdFlags)
	logger.Println("старт программы")

	fmt.Println("Start server:8080 [golang 1.15 fiber 1.14]")

	// engine := mustache.New("./views", ".mustache")
	engine := mustache.New("./views", ".html")

	app := fiber.New(fiber.Config{
		Views: engine,
	})

	// app.Settings.TemplateEngine = template.Mustache() // "mustache"
	// app.Settings.TemplateExtension = ".html"
	// app.Settings.TemplateFolder = "./views"

	// app.Settings.Views = engine
	// app.Settings.DisableStartupMessage = true

	app.Static("/", "./public")

	app.Get("/", test0)
	app.Get("/test1", test1)
	app.Get("/test2", test2)
	app.Get("/test3", test3)
	app.Post("/main3", main3)
	app.Post("/kadry", kadry)
	app.Post("/kadryj", kadryj)

	app.Listen(":8080")
}

// проверка записи в файл
func log_file() {
	mydata := []byte("all my data I want to write to a file")

	err := ioutil.WriteFile("./base/myfile.data", mydata, 0777)
	if err != nil {
		// Если произошла ошибка выводим ее в консоль
		fmt.Println(err)
	}

}

func test0(c *fiber.Ctx) error {
	return c.Send([]byte("Проверка работы главного экрана. Работает на Golang, Fiber, Mustache"))
}

func test1(c *fiber.Ctx) error {
	//	c.Send(c.BaseURL())
	//c.Send(c.Method())
	return c.Send([]byte(c.IP()))
	//	c.Send(c.Body())
}

func test2(c *fiber.Ctx) error {
	return c.SendString("Проверка работы вывода строки")
}

// загрузка шаблона index
func test3(c *fiber.Ctx) error {
	return c.Render("index", fiber.Map{"title": "ЗАГОЛОВОК"})
}

// формируем подшаблон kadry
func kadry(c *fiber.Ctx) error {
	v := [9]map[string]interface{}{
		{"id": 0, "code": 100, "name": "Михаил", "adr": "Воркута, Ленина, 55", "tst": "Ягодка", "pin": "30554"},
		{"id": 1, "code": 200, "name": "Александр", "adr": "Воркута, Гоголя, 7", "tst": "Чистый мир", "pin": "71324"},
		{"id": 2, "code": 202, "name": "Константин", "adr": "Ярославль, Центральная, 5", "tst": "Горячий хлеб", "pin": "53878"},
		{"id": 3, "code": 240, "name": "Лена", "adr": "Нерехта, Пролетарская, 14", "tst": "Оазис", "pin": "77623"},
		{"id": 4, "code": 250, "name": "Николай", "adr": "Воркута, Возейская, 11", "tst": "Спорт товары", "pin": "67098"},
		{"id": 5, "code": 270, "name": "Эдуард", "adr": "Москва, Ватутина, 4", "tst": "Мадам шик", "pin": "57332"},
		{"id": 6, "code": 340, "name": "Павел", "adr": "Нерехта, Пролетарская, 21", "tst": "Аромат", "pin": "32775"},
		{"id": 7, "code": 345, "name": "Лена", "adr": "Ярославль, Ленинский просп., 11", "tst": "Лиса", "pin": "80921"},
		{"id": 8, "code": 350, "name": "Анна", "adr": "Ярославль, Ленинградская, 71", "tst": "Мясная лавка", "pin": "78367"}}

	return c.Render("kadry", fiber.Map{"line": v})
}

// формируем таблицу через json
func kadryj(c *fiber.Ctx) error {
	var k Kadry

	if err := c.BodyParser(&k); err != nil {
		fmt.Println("Err =>", err.Error())
	}

	fmt.Println("=>", k.Id, k.Rem, k.Sum)

	v := [9]map[string]interface{}{
		{"id": 0, "code": 100, "name": "Михаил", "adr": "Воркута, Ленина, 55", "tst": "Ягодка", "pin": "30554"},
		{"id": 1, "code": 200, "name": "Александр", "adr": "Воркута, Гоголя, 7", "tst": "Чистый мир", "pin": "71324"},
		{"id": 2, "code": 202, "name": "Константин", "adr": "Ярославль, Центральная, 5", "tst": "Горячий хлеб", "pin": "53878"},
		{"id": 3, "code": 240, "name": "Лена", "adr": "Нерехта, Пролетарская, 14", "tst": "Оазис", "pin": "77623"},
		{"id": 4, "code": 250, "name": "Николай", "adr": "Воркута, Возейская, 11", "tst": "Спорт товары", "pin": "67098"},
		{"id": 5, "code": 270, "name": "Эдуард", "adr": "Москва, Ватутина, 4", "tst": "Мадам шик", "pin": "57332"},
		{"id": 6, "code": 340, "name": "Павел", "adr": "Нерехта, Пролетарская, 21", "tst": "Аромат", "pin": "32775"},
		{"id": 7, "code": 345, "name": "Лена", "adr": "Ярославль, Ленинский просп., 11", "tst": "Лиса", "pin": "80921"},
		{"id": 8, "code": 350, "name": "Анна", "adr": "Ярославль, Ленинградская, 71", "tst": "Мясная лавка", "pin": "78367"}}

	return c.JSON(v)
}

func main3(c *fiber.Ctx) error {
	var k Kadry

	if err := c.BodyParser(&k); err != nil {
		fmt.Println("Err =>", err.Error())
	}

	fmt.Println("=>", k.Id, k.Rem, k.Sum, c.Params("Rem", "++"))

	return c.JSON(fiber.Map{"code": 990, "name": "Наименование обьекта", "sum": 1234.56})
}

// пример вызова расчета быстрой кеша функции
func r1() {

	s := "abc"
	n := fingerprint([]byte(s))
	fmt.Printf("%s: %d\n", s, n)

	s = "123"
	n = fingerprint([]byte(s))
	fmt.Printf("%s: %d\n", s, n)

	s = "1234"
	n = fingerprint([]byte(s))
	fmt.Printf("%s: %d\n", s, n)

	s = "В чащах юга жил был цитрус, да но фальшивый экземпляр."
	n = fingerprint([]byte(s))
	fmt.Printf("%s: %d\n", s, n)

	guid := xid.New()
	fmt.Println(guid.String())
	fmt.Println(xid.New().String())
	fmt.Println(xid.New().String())
}

// расчет не криптографического кеша с большой скоростью
func fingerprint(b []byte) uint64 {
	hash := fnv.New64a()
	hash.Write(b)
	return hash.Sum64()
}
