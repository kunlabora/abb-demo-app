alias Acl.Accessibility.Always, as: AlwaysAccessible
alias Acl.GraphSpec.Constraint.Resource, as: ResourceConstraint
alias Acl.Accessibility.ByQuery, as: AccessByQuery
alias Acl.GraphSpec, as: GraphSpec
alias Acl.GroupSpec, as: GroupSpec
alias Acl.GroupSpec.GraphCleanup, as: GraphCleanup

defmodule Acl.UserGroups.Config do
  def user_groups do
    # These elements are walked from top to bottom.  Each of them may
    # alter the quads to which the current query applies.  Quads are
    # represented in three sections: current_source_quads,
    # removed_source_quads, new_quads.  The quads may be calculated in
    # many ways.  The useage of a GroupSpec and GraphCleanup are
    # common.
    [
      # // PUBLIC
      %GroupSpec{
        name: "books",
        useage: [:read, :write, :read_for_write],
        access: %AlwaysAccessible{},
        graphs: [ %GraphSpec{
          graph: "http://mu.semte.ch/graphs/books",
          constraint: %ResourceConstraint{
            resource_types: [
              "http://schema.org/Book",
              "http://schema.org/author"
            ]
          } } ] },

      %GroupSpec{
        name: "awards",
        useage: [:read],
        access: %AlwaysAccessible{},
        graphs: [ %GraphSpec{
          graph: "http://mu.semte.ch/graphs/awards",
          constraint: %ResourceConstraint{
            resource_types: [
              "http://data.nobelprize.org/terms/LaureateAward",
              "http://data.nobelprize.org/terms/Laureate",
              "http://data.nobelprize.org/terms/Category",
              "http://dbpedia.org/ontology/City",
              "http://dbpedia.org/ontology/Country",
              "http://dbpedia.org/ontology/University"
            ]
          } } ] },

      # // CLEANUP
      #
      %GraphCleanup{
        originating_graph: "http://mu.semte.ch/application",
        useage: [:write],
        name: "clean"
      }
    ]
  end
end
