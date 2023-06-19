(in-package :mu-cl-resources)

(define-resource book ()
  :class (s-prefix "schema:Book")
  :properties `((:title :string ,(s-prefix "schema:name"))
                (:isbn :string ,(s-prefix "schema:isbn")))
  :resource-base (s-url "http://my-application/books/")
  :on-path "books")
