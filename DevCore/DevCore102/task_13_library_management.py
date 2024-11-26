class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.is_available = True  

    def display_info(self):
        status = "Available" if self.is_available else "Not Available"
        print(f"'{self.title}' by {self.author} (ISBN: {self.isbn}) - {status}")


class Library:
    def __init__(self):
        self.books = []

    def add_book(self, book):
        self.books.append(book)

    def search_book_by_title(self, title):
        return [book for book in self.books if title.lower() in book.title.lower()]

    def list_available_books(self):
        available_books = [book for book in self.books if book.is_available]
        if available_books:
            print("\nAvailable books in the library:")
            for book in available_books:
                book.display_info()
        else:
            print("No available books in the library.")

    def borrow_book(self, title, user):
        for book in self.books:
            if book.title.lower() == title.lower() and book.is_available:
                if len(user.borrowed_books) >= 3:
                    print(f"{user.name} cannot borrow more than 3 books.")
                    return
                book.is_available = False
                user.borrowed_books.append(book)
                print(f"Book '{book.title}' has been successfully borrowed by {user.name}.")
                return
        print(f"Book '{title}' is not available for borrowing.")

    def return_book(self, title, user):
        for book in user.borrowed_books:
            if book.title.lower() == title.lower():
                book.is_available = True
                user.borrowed_books.remove(book)
                print(f"Book '{book.title}' has been returned and is now available.")
                return
        print(f"Book '{title}' was not borrowed by {user.name}.")


class User:
    def __init__(self, name, user_id):
        self.name = name
        self.user_id = user_id
        self.borrowed_books = []

    def display_borrowed_books(self):
        if self.borrowed_books:
            print(f"\n{self.name}'s borrowed books:")
            for book in self.borrowed_books:
                book.display_info()
        else:
            print(f"{self.name} has not borrowed any books.")



def main():
    library = Library()
  
    library.add_book(Book("1984", "George Orwell", "12345"))
    library.add_book(Book("The Master and Margarita", "Mikhail Bulgakov", "54321"))
    library.add_book(Book("Қыз Жібек", "Жүсіпбек Аймауытов", "67890"))
    library.add_book(Book("Абай жолы", "Мұхтар Әуезов", "98765"))
    library.add_book(Book("Crime and Punishment", "Fyodor Dostoevsky", "24680"))

    while True:
        library.list_available_books()
        user_name = input("\nEnter your name (or type 'stop' to exit): ")
        if user_name.lower() == "stop":
            break
        user_id = input("Enter your user ID: ")
        user = User(user_name, user_id)

        while True:
            action = input("\nChoose an action - 'borrow', 'return', 'list' borrowed books, or 'stop' to exit: ").lower()
            if action == "stop":
                break
            elif action == "borrow":
                title = input("Enter the title of the book you want to borrow: ")
                library.borrow_book(title, user)
            elif action == "return":
                title = input("Enter the title of the book you want to return: ")
                library.return_book(title, user)
            elif action == "list":
                user.display_borrowed_books()
            else:
                print("Invalid action. Please choose again.")

# Run the program
main()
